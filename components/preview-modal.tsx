"use client";

import Gallery from "@/components/gallery";
import Modal from "@/components/ui/modal";
import Info from "@/components/product-info";
import { usePreviewContext } from "@/context/usePreview";
import PreviewInfo from "./preview-info";


const PreviewModal = () => {
  const { previewModal, onClose } = usePreviewContext();

  const product = previewModal.data;
  if (!product) {
    return null;
  }

  return ( 
    <Modal 
      open={previewModal.isOpen} 
      onClose={onClose}
    >
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <PreviewInfo
            product={product}  
          />
        </div>
      </div>
    </Modal>
  );
}
 
export default PreviewModal;