import React from 'react';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'motion/react';

export interface HeroParallaxProduct {
    title: string;
    link: string;
    thumbnail: string;
}

interface HeroParallaxProps {
    products: HeroParallaxProduct[];
    header?: React.ReactNode;
}

export const HeroParallax = ({ products, header }: HeroParallaxProps) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

    return (
        <div
            ref={ref}
            className="relative flex h-[300vh] flex-col self-auto overflow-hidden bg-[#F8FAFC] antialiased [perspective:1000px] [transform-style:preserve-3d]"
        >
            {header ?? <DefaultHeader />}
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
            >
                <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
                    {firstRow.map((product) => (
                        <ProductCard product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className="mb-20 flex flex-row space-x-20">
                    {secondRow.map((product) => (
                        <ProductCard product={product} translate={translateXReverse} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
                    {thirdRow.map((product) => (
                        <ProductCard product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

const DefaultHeader = () => (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-20 md:py-40">
        <h1 className="font-display text-2xl font-bold text-[#1E293B] md:text-7xl">
            The #1 Source for <br /> Capstone Projects
        </h1>
        <p className="mt-8 max-w-2xl font-body text-base text-slate-500 md:text-xl">
            Browse verified, production-ready capstone systems built by developers and students.
        </p>
    </div>
);

export const ProductCard = ({
    product,
    translate,
}: {
    product: HeroParallaxProduct;
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{ x: translate }}
            whileHover={{ y: -20 }}
            key={product.title}
            className="group/product relative h-96 w-[30rem] shrink-0 overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-md"
        >
            <a href={product.link} className="block group-hover/product:shadow-2xl">
                <img
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="absolute inset-0 h-full w-full object-cover object-left-top"
                    alt={product.title}
                />
            </a>
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80" />
            <h2 className="absolute bottom-4 left-4 font-body text-white opacity-0 group-hover/product:opacity-100">
                {product.title}
            </h2>
        </motion.div>
    );
};
