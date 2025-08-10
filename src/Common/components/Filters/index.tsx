import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import './index.css'

interface FilterOption {
    header: string;
    options: {
        value: string;
        label: string;
    }[];
}

const Filter: React.FC<{ options: FilterOption[] }> = ({ options }) => {
    return (
        <div className="filter-container">
            {options.map((option) => (
                <AnimatedDetails key={option.header} header={option.header}>
                    <ul className="filter-options">
                        {option.options.map((opt) => (
                            <li key={opt.value}>
                                <label htmlFor={opt.value}>
                                    <input type="checkbox" id={opt.value} value={opt.value} />
                                    {opt.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </AnimatedDetails>
            ))}
        </div>
    );
};

const AnimatedDetails: React.FC<{ header: string; children: React.ReactNode }> = ({ header, children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(true);

    useGSAP(() => {
        const el = contentRef.current;
        if (!el) return;
        if (open) {
            gsap.to(el, { height: "auto", duration: 0.3, ease: "none" });
        } else {
            gsap.to(el, { height: 0, duration: 0.3, ease: "none" });
        }
    }, [open]);

    return (
        <div className="filter-option">
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="filter-header"
            >
                <h4>{header}</h4>
                <svg
                    style={{ marginLeft: 8, transform: open ? "rotate(0deg)" : "rotate(-180deg)", transition: "transform 0.3s" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="10"
                    viewBox="0 0 17 10"
                    fill="none"
                >
                    <path d="M1 9L8.5 2L16 9" stroke="#052F5A" strokeWidth="2" />
                </svg>
            </div>
            <div
                ref={contentRef}
                className="filter-content"
            >
                {children}
            </div>
        </div>
    );
};

export default Filter;
