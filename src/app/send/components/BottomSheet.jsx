"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomSheet({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal forceMount>
        {/* 불투명 컨테이너 */}
        <AnimatePresence initial={false}>
          {open && (
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>

        {/* Sheet */}
        <AnimatePresence initial={false}>
          {open && (
            <Dialog.Content>
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-[60] bg-white rounded-t-4xl
             h-[60vh] p-6 pb-[max(16px,env(safe-area-inset-bottom))]
             overflow-y-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 320 }}
              >
                {/* BottomSheet 타이틀 */}
                <Dialog.Title className="text-[1.375rem] font-semibold pt-[1.875rem] mb-10 text-left">
                  {title}
                </Dialog.Title>
                {/* BottomSheet 내용 */}

                {children}
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
