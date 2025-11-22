export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Gold Standard Whey',
    description: 'Proteína de suero de leche de alta calidad para desarrollo muscular.',
    price: 59.99,
    image: 'https://gnc.com.mx/media/catalog/product/1/0/107206001-a.jpg'
  },
  {
    id: 2,
    name: 'Creatine Monohydrate',
    description: 'Monohidrato de creatina para mejorar la fuerza y el rendimiento.',
    price: 24.99,
    image: 'https://m.media-amazon.com/images/I/71O3oYyFxBL.jpg'
  },
  {
    id: 3,
    name: 'C4 Pre-Workout',
    description: 'Fórmula pre-entrenamiento para energía y concentración explosiva.',
    price: 39.99,
    image: 'https://resources.claroshop.com/medios-plazavip/t1/1725320863xsuppssuplementoschalcocellucorc4original607jpg'
  },
  {
    id: 4,
    name: 'BCAA Energy',
    description: 'Aminoácidos de cadena ramificada para recuperación y energía.',
    price: 29.99,
    image: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/evl/evl02512/l/8.jpg'
  },
  {
    id: 5,
    name: 'Serious Mass',
    description: 'Ganador de peso alto en calorías para aumento de masa muscular.',
    price: 69.99,
    image: 'https://cdn.shopify.com/s/files/1/0020/2876/5233/products/proteina-wheyner-mass-937432.jpg?v=1698158799'
  },
  {
    id: 6,
    name: 'Multivitamin',
    description: 'Complejo multivitamínico para soporte de la salud general.',
    price: 19.99,
    image: 'https://media.suplementosgym.com.mx/media/catalog/product/cache/2/small_image/300x/713b5111b78bd93a4a79b9899d195c9f/m/u/mutant-multi-jpg.jpg'
  }
];
