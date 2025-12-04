"use client";

import DaumPostcode from "react-daum-postcode";
import { MapPin, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";

export default function AddressSearchModal({ open, onOpenChange, onComplete }) {
  const t = useTranslations("send.components.addressModal");
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete(fullAddress);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] w-[90vw] p-0 gap-0 overflow-hidden rounded-xl border-0 shadow-2xl">
        <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {t("title")}
        </DialogTitle>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-1 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="bg-white h-[500px] overflow-hidden">
          <DaumPostcode
            onComplete={handleComplete}
            autoClose={false}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
