import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const products = [
  {
    name: "Acai Berry Extract",
    description: "Rich in antioxidants, perfect for supplements and functional foods.",
    image: "/placeholder.svg", 
  },
  {
    name: "Green Tea Extract",
    description: "Known for its metabolism-boosting and antioxidant properties.",
    image: "/placeholder.svg",
  },
  {
    name: "Ginseng Extract",
    description: "A popular adaptogen used to improve energy and cognitive function.",
    image: "/placeholder.svg",
  },
  {
    name: "Turmeric Extract",
    description: "Contains curcumin, a powerful anti-inflammatory and antioxidant.",
    image: "/placeholder.svg",
  },
  {
    name: "Elderberry Extract",
    description: "Commonly used to support the immune system, especially during cold season.",
    image: "/placeholder.svg",
  },
];

export function ProductCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-10">Featured Products</h2>
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded-full" />
                      <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">{product.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}