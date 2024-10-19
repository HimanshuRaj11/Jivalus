"use client"

import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
const baseUrl = "http://localhost:3000/api"



function UploadProfileImage() {
    const [resource, setResource] = useState();
    console.log(resource);

    return (
        <div>

            <CldUploadWidget uploadPreset="my-upload-preset"
                options={{ sources: ['local', 'url'] }}
                signatureEndpoint={`${baseUrl}/user/Update/ProfilePic`}
                onSuccess={(result, { widget }) => {
                    setResource(result?.info);  // { public_id, secure_url, etc }
                }}
                onQueuesEnd={(result, { widget }) => {
                    widget.close();
                }}
            >
                {({ open }) => {
                    function handleOnClick() {
                        setResource(undefined);
                        open();
                    }
                    return (
                        <button onClick={handleOnClick}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default UploadProfileImage
