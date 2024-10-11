"use client"

const Notification = ({ children }) => {
    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-24 flex flex-col gap-6 z-20">
            {children}
        </div>
    )
}

export default Notification;
