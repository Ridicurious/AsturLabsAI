// src/components/CanvasAnimation.tsx
import React, { useEffect, useRef } from 'react';

const CanvasAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let nodes: Node[] = [];
        const nodeCount = 100;
        const maxDistance = 100;
        const pinkNodeCount = 20;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Node {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;

            constructor() {
                this.x = weightedRandom(canvas.width);
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = 2 + Math.random() * 2;
                this.color = '#00aaff';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fillStyle = this.color;
                context.fill();
            }
        }

        const drawLines = () => {
            if (!ctx) return;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        let gradient;
                        if (nodes[i].color !== nodes[j].color) {
                            gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                            gradient.addColorStop(0, nodes[i].color);
                            gradient.addColorStop(1, nodes[j].color);
                        } else {
                            gradient = nodes[i].color;
                        }

                        let opacity = 1 - dist / maxDistance;
                        let strokeStyle;

                        if (typeof gradient === 'string') {
                            strokeStyle = `rgba(${parseInt(gradient.substring(1, 3), 16)},${parseInt(gradient.substring(3, 5), 16)},${parseInt(gradient.substring(5, 7), 16)},${opacity})`;
                        } else {
                            strokeStyle = gradient;
                        }

                        ctx.strokeStyle = strokeStyle;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach(node => {
                node.update();
                node.draw(ctx);
            });
            drawLines();
            requestAnimationFrame(animate);
        };

        const initAnimation = () => {
            resizeCanvas();
            nodes = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push(new Node());
            }
            for (let i = 0; i < pinkNodeCount; i++) {
                nodes[Math.floor(Math.random() * nodeCount)].color = "#e62a8e";
            }
            animate();
        };

        initAnimation();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen z-[-1] bg-gradient-to-r from-[#02103d] to-[#063c70] [filter:url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\' x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0.25\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]"
        />
    );
};

function weightedRandom(max: number) {
    return Math.pow(Math.random(), 2) * max;
}

export default CanvasAnimation;