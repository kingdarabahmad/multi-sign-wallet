"use client"
import React, { useState } from 'react'
import CreateBoxStepper from '@/app/components/createPageComponents/CreateBoxStepper'

const page = () => {
    return (
        <div className=' min-h-[90vh] flex justify-center items-center flex-col p-4 bg-[#f4f4f4]'>
            <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
                Create New Account
            </h1>
            <CreateBoxStepper />
        </div>
    )
}

export default page