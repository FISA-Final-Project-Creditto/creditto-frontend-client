"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

export default function BottomSheet({
  open,
  onOpenChange,
  title,
  trigger,
  children,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {/* 열기 버튼 */}
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* 오버레이 */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            {/* 접근성용 숨겨진 제목 (필수) */}
            <Dialog.Title className="sr-only">
              {title || "Bottom sheet"}
            </Dialog.Title>

            {/* 바텀 시트 본체 */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] rounded-t-2xl bg-white
                           shadow-[0_-8px_30px_rgba(0,0,0,0.2)] p-5 flex flex-col"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              >
                {/* 헤더 (눈에 보이는 부분, 꼭 Title일 필요 X) */}
                <div className="mb-3 flex items-center justify-between">
                  {title && (
                    <h2 className="text-base font-semibold text-gray-900">
                      {title}
                    </h2>
                  )}

                  <Dialog.Close asChild>
                    <button
                      className="h-8 w-8 flex items-center justify-center rounded-full
                                 hover:bg-gray-100 active:scale-95 transition"
                    >
                      <span className="text-2xl leading-none">&times;</span>
                    </button>
                  </Dialog.Close>
                </div>

                {/* 내용 */}
                <div className="flex-1 overflow-y-auto">{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
