import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { logout } from "../redux/authSlice";
import { useAppDispatch } from "../redux/hooks";

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState('/');
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

    const menu = [
        {
            title: 'Home',
            path: '/',
            icon: (
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 50 50">
                    <path d="M 25 1.05 C 24.78 1.05 24.56 1.12 24.38 1.26 L 1.38 19.21 C 0.95 19.55 0.87 20.18 1.21 20.62 C 1.55 21.05 2.18 21.13 2.62 20.79 L 4 19.71 V 46 C 4 46.55 4.45 47 5 47 H 19 V 29 H 31 V 47 H 45 C 45.55 47 46 46.55 46 46 V 19.71 L 47.38 20.79 C 47.57 20.93 47.78 21 48 21 C 48.3 21 48.59 20.87 48.79 20.62 C 49.13 20.18 49.05 19.55 48.62 19.21 L 25.62 1.26 C 25.43 1.12 25.22 1.05 25 1.05 Z" />
                </svg>
            ),
        },
        {
            title: 'Card',
            path: '/cards',
            icon: (
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6M4 8h16V6H4zm0 4v6h16v-6zm0 6V6z" />
                </svg>
            ),
        },
    ];

    return (
        <div>
            <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
            </button>

            <aside
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-40 w-52 h-screen transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 bg-purple-800`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2 my-8 mx-2 font-medium">
                        {menu.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => {
                                        setActiveTab(item.path);
                                        if (window.innerWidth < 768) setIsOpen(false); 
                                    }}
                                    className={`flex items-center py-2 px-6 rounded-lg hover:text-white hover:bg-purple-600 group ${
                                        activeTab === item.path ? "bg-purple-600 text-white" : "text-gray-200"
                                    }`}
                                >
                                    {item.icon}
                                    <span className="ms-3">{item.title}</span>
                                </NavLink>
                            </li>
                        ))}
                        <li className="h-4 border-b border-purple-200 mb-3"></li>
                        <li onClick={() => dispatch(logout())} className="flex items-center py-2 px-6 cursor-pointer rounded-lg hover:text-white hover:bg-purple-600 group text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M11 12V4q0-.425.288-.712T12 3t.713.288T13 4v8q0 .425-.288.713T12 13t-.712-.288T11 12m1 9q-1.85 0-3.488-.712T5.65 18.35t-1.937-2.863T3 12q0-1.725.638-3.312T5.425 5.85q.275-.3.7-.3t.725.3q.275.275.25.688t-.3.737q-.85.95-1.325 2.163T5 12q0 2.9 2.05 4.95T12 19q2.925 0 4.963-2.05T19 12q0-1.35-.475-2.588t-1.35-2.187q-.275-.3-.288-.7t.263-.675q.3-.3.725-.3t.7.3q1.175 1.25 1.8 2.838T21 12q0 1.85-.712 3.488t-1.925 2.862t-2.85 1.938T12 21"/>
                            </svg>
                            <span className="ms-3">{`Logout`}</span>
                        </li>
                    </ul>
                    
                </div>
            </aside>
        </div>
    );
}
