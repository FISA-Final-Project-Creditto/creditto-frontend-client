"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomSheet({ open, onOpenChange, children }) {
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
                className="fixed bottom-0 h-[60vh] left-0 right-0 z-[60] bg-white rounded-t-2xl p-6 pb-[max(16px,env(safe-area-inset-bottom))]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 320 }}
              >
                <Dialog.Title className="text-[22px] font-semibold pt-[1.875rem] mb-[15px]">
                  크레디토 인증서를 만들게요
                </Dialog.Title>
                {/* drag handle */}
                {children}
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
