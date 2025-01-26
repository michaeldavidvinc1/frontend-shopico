import {Bell} from "lucide-react";

const NotificationButton = () => {
    return (
        <div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative">
                <Bell className="w-5 h-5"/>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"/>
            </button>
        </div>
    )
}

export default NotificationButton