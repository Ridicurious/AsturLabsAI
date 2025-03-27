// src/components/CanvasAnimation.tsx
import React, { useEffect, useRef } from 'react';

// Define the Node class outside the useEffect hook, but pass canvas dimensions or the canvas itself when needed.
class Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    // Add canvas dimensions to the constructor or relevant methods
    canvasWidth: number;
    canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        // Use weightedRandom correctly for initial positioning
        this.x = weightedRandom(this.canvasWidth);
        this.y = Math.random() * this.canvasHeight;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = 2 + Math.random() * 2;
        this.color = '#00aaff'; // Default color
    }

    // Pass canvas dimensions to the update method for boundary checks
    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;
        // Use the passed dimensions for boundary checks
        if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
             this.vx *= -1;
             // Clamp position to prevent sticking outside bounds
             this.x = Math.max(this.radius, Math.min(this.x, canvasWidth - this.radius));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
             this.vy *= -1;
             // Clamp position
             this.y = Math.max(this.radius, Math.min(this.y, canvasHeight - this.radius));
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

function weightedRandom(max: number) {
    // Ensure max is non-negative
    if (max <= 0) return 0;
    // A simple weighting towards lower numbers
    return Math.pow(Math.random(), 2) * max;
}


const CanvasAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Use useRef to keep track of nodes and animation frame across renders
    const nodesRef = useRef<Node[]>([]);
    const animationFrameId = useRef<number | null>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        // Initial check for canvas and context
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const nodeCount = 100;
        const maxDistance = 100;
        const pinkNodeCount = 20;


        const resizeCanvas = () => {
            // Ensure canvas exists before resizing
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
             // Re-initialize or update nodes based on new dimensions if needed
             // For simplicity here, we'll just let them continue from their current positions
             // But ideally, you might want to reposition nodes that are now out of bounds
        };


        const drawLines = () => {
            // Ensure ctx exists
             if (!ctx) return;
             const currentNodes = nodesRef.current; // Use the ref's current value
            for (let i = 0; i < currentNodes.length; i++) {
                for (let j = i + 1; j < currentNodes.length; j++) {
                    const dx = currentNodes[i].x - currentNodes[j].x;
                    const dy = currentNodes[i].y - currentNodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(currentNodes[i].x, currentNodes[i].y);
                        ctx.lineTo(currentNodes[j].x, currentNodes[j].y);

                        let gradient: CanvasGradient | string;
                        if (currentNodes[i].color !== currentNodes[j].color) {
                            gradient = ctx.createLinearGradient(currentNodes[i].x, currentNodes[i].y, currentNodes[j].x, currentNodes[j].y);
                            gradient.addColorStop(0, currentNodes[i].color);
                            gradient.addColorStop(1, currentNodes[j].color);
                        } else {
                            gradient = currentNodes[i].color;
                        }

                        let opacity = 1 - dist / maxDistance;
                        opacity = Math.max(0, Math.min(1, opacity)); // Clamp opacity between 0 and 1

                        let strokeStyle: string | CanvasGradient;

                        if (typeof gradient === 'string') {
                            // Safer way to handle hex to rgba conversion
                            const r = parseInt(gradient.substring(1, 3), 16);
                            const g = parseInt(gradient.substring(3, 5), 16);
                            const b = parseInt(gradient.substring(5, 7), 16);
                            // Check if parsing was successful before creating the string
                            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                                strokeStyle = `rgba(${r},${g},${b},${opacity})`;
                            } else {
                                // Fallback if color string is invalid
                                strokeStyle = `rgba(0, 170, 255, ${opacity})`; // Default blue with opacity
                            }

                        } else {
                            // If it's already a gradient, we can't easily apply opacity directly to the strokeStyle.
                            // A common approach is to set globalAlpha before stroking.
                            // However, applying globalAlpha affects everything drawn afterwards.
                            // For simplicity, let's keep the gradient as is, or maybe fade the gradient colors themselves (more complex).
                            // A simpler compromise for gradients is to use a fixed opacity or skip opacity.
                            // Let's try applying globalAlpha temporarily.
                            const currentAlpha = ctx.globalAlpha;
                            ctx.globalAlpha = opacity;
                            strokeStyle = gradient;
                            ctx.strokeStyle = strokeStyle;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                            ctx.globalAlpha = currentAlpha; // Restore previous alpha
                            continue; // Skip the standard stroke below
                        }

                        ctx.strokeStyle = strokeStyle;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            // Ensure canvas and ctx exist at the start of each frame
            const currentCanvas = canvasRef.current;
            const currentCtx = currentCanvas?.getContext('2d');

            if (!currentCanvas || !currentCtx) {
                 if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                    animationFrameId.current = null;
                 }
                 return; // Stop animation if canvas/context is lost
            }


            currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
            const currentNodes = nodesRef.current; // Get nodes from ref
            currentNodes.forEach(node => {
                // Pass current canvas dimensions to update
                node.update(currentCanvas.width, currentCanvas.height);
                node.draw(currentCtx);
            });
            drawLines(); // drawLines internally checks for ctx
            animationFrameId.current = requestAnimationFrame(animate);
        };

        const initAnimation = () => {
            // We already checked canvas and ctx exist before calling this
            resizeCanvas(); // Initial size set
            const initialNodes: Node[] = [];
            for (let i = 0; i < nodeCount; i++) {
                // Pass current canvas dimensions to the Node constructor
                initialNodes.push(new Node(canvas.width, canvas.height));
            }
            // Assign pink color
             let assignedPink = 0;
             while (assignedPink < pinkNodeCount && initialNodes.length > 0) {
                 const randomIndex = Math.floor(Math.random() * initialNodes.length);
                 if (initialNodes[randomIndex].color !== "#e62a8e") { // Avoid re-coloring the same node if randomly picked again
                     initialNodes[randomIndex].color = "#e62a8e";
                     assignedPink++;
                 }
                 // Safety break if somehow we can't assign enough (e.g., pinkNodeCount > nodeCount)
                 if (assignedPink >= initialNodes.length) break;
             }

            nodesRef.current = initialNodes; // Store nodes in the ref

            // Start animation if not already running
            if (animationFrameId.current === null) {
                 animate();
            }
        };

        initAnimation();
        window.addEventListener('resize', resizeCanvas); // resizeCanvas already checks for canvas

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            // Cancel animation frame on unmount
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
             // Clear nodes ref on unmount
             nodesRef.current = [];
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen z-[-1] bg-gradient-to-r from-[#02103d] to-[#063c70] [filter:url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\' x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0.25\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]"
        />
    );
};

export default CanvasAnimation;