"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function AddCourse() {
    const {user} = useUser();
  return (
    <div className='flex justify-between items-center'>
        <div>
            <h2 className='text-3xl'>Hello, <span className='font-bold'>{user?.fullName}👋</span></h2>
            <p className='text-sm text-gray-500'>Create new Courses with AI , and share with your peers too</p>
        </div>

        <Link href={'/create-course'}>
             <Button>Create AI course here!</Button>
        </Link>
    </div>
  )
}

export default AddCourse