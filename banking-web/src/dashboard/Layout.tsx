import Sidebar from "../component/Sidebar"
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return <div className="bg-purple-800 ">
        <Sidebar />
        <div className="p-2 bg-purple-800 min-h-screen flex flex-col">
            <div className="md:ml-52">
                <div className="container rounded-4xl mx-auto bg-purple-50 flex-grow p-5 sm:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
}