import React from 'react'

function Footer() {
    return (
        <div className="px-5  text-white py-4 my-8">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <a href="/home" className="hover:text-blue-500">
                        Home
                    </a>
                    <a href="/about" className="hover:text-blue-400">
                        About
                    </a>
                    <a href="/contact" className="hover:text-pink-500">
                        Contact
                    </a>
                    <a href="/job" className="hover:text-blue-700">
                        Job
                    </a>
                </div>
                <p className="text-sm">&copy; 2023 LIVALUS. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
