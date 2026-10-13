import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ProductImage as ProductImageData } from '@/lib/data/catalog'

interface ProductStageProps {
  image: ProductImageData
  sizes: string
  priority?: boolean
  className?: string
}

/** Square product stage: continuous white surface, subject fully visible with object-fit: contain. */
export function ProductStage({ image, sizes, priority, className }: ProductStageProps) {
  return (
    <div className={cn('product-stage relative aspect-square w-full overflow-hidden', className)}>
      <div className="lift-media absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain"
          style={{ transform: `scale(${image.stageScale})` }}
        />
      </div>
    </div>
  )
}
