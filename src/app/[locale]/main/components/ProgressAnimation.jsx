"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CircleProgress = (props) => {
  const {
    value,
    maxValue,
    size = 100,
    strokeWidth = 3,
    showValue = false,
    description,
    suffix,
    counterClockwise = false,
    onColorChange,
    onValueChange,
    getColor,
    className,
    animationDuration = 300,
    disableAnimation = false,
    useGradient = false,
    gradientColors = ["#10b981", "#f59e0b", "#ef4444"],
    gradientId,
    ...rest
  } = props;

  const [animatedValue, setAnimatedValue] = useState(
    disableAnimation ? value : 0
  );
  const animatedValueRef = useRef(animatedValue);

  const uniqueGradientId = useRef(
    gradientId ||
      `circle-progress-gradient-${Math.random().toString(36).substring(2, 9)}`
  ).current;

  useEffect(() => {
    animatedValueRef.current = animatedValue;
  }, [animatedValue]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeMax = maxValue || 1;
  const fillPercentage = Math.min(animatedValue / safeMax, 1);
  const strokeDashoffset = circumference * (1 - fillPercentage);

  const defaultGetColor = (percentage) => {
    if (percentage < 0.7) return "stroke-emerald-500";
    if (percentage < 0.9) return "stroke-amber-500";
    return "stroke-red-500";
  };

  const currentColor = useGradient
    ? ""
    : getColor
    ? getColor(fillPercentage)
    : defaultGetColor(fillPercentage);

  // 애니메이션 (브라우저에서만)
  useEffect(() => {
    if (disableAnimation) {
      setAnimatedValue(value);
      return;
    }

    if (typeof window === "undefined") {
      // 서버에서는 애니메이션 없이 값만 맞춰둠
      setAnimatedValue(value);
      return;
    }

    const start = animatedValueRef.current;
    const end = Math.min(value, maxValue);
    const startTime = window.performance.now();

    if (start === end) return;

    const animateProgress = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentValue = start + (end - start) * easeProgress;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(animateProgress);
      }
    };

    const frame = window.requestAnimationFrame(animateProgress);
    return () => window.cancelAnimationFrame(frame);
  }, [value, maxValue, animationDuration, disableAnimation]);

  useEffect(() => {
    if (onColorChange) {
      onColorChange(currentColor);
    }
  }, [currentColor, onColorChange]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(animatedValue, fillPercentage);
    }
  }, [animatedValue, fillPercentage, onValueChange]);

  const valueText =
    rest["aria-valuetext"] ||
    `${Math.round(value)}${suffix || ""} out of ${maxValue}${suffix || ""}, ${Math.round(fillPercentage * 100)}% complete`;

  return (
    <div
      className={cn(className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuetext={valueText}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="duration-300"
      >
        {useGradient && (
          <defs>
            <linearGradient
              id={uniqueGradientId}
              gradientUnits="userSpaceOnUse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              {gradientColors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${
                    (index /
                      (gradientColors.length > 1
                        ? gradientColors.length - 1
                        : 1)) * 100
                  }%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
        )}

        {/* 배경 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-transparent stroke-gray-200 dark:stroke-gray-700"
          strokeWidth={strokeWidth}
        />

        {/* 진행 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn(
            "fill-transparent transition-colors",
            !useGradient && currentColor
          )}
          style={
            useGradient ? { stroke: `url(#${uniqueGradientId})` } : undefined
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={
            counterClockwise ? -strokeDashoffset : strokeDashoffset
          }
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
        />
      </svg>

      {showValue && (
        <div className="mt-1 text-xs text-center">
          {Math.round(fillPercentage * 100)}%
          {description && (
            <div className="text-[10px] text-gray-500">{description}</div>
          )}
        </div>
      )}
    </div>
  );
};

export { CircleProgress };
