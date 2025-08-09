import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db';

function EditCourseBasicInfo({ course }) {
    const [name, setName] = useState(course?.courseOutput?.CourseName || '');
    const [description, setDescription] = useState(course?.courseOutput?.Description || '');

    useEffect(() => {
        if (course?.courseOutput) {
            setName(course.courseOutput.CourseName || '');
            setDescription(course.courseOutput.Description || '');
        }
    }, [course]);

    const onUpdateHandler = async () => {
        if (!course?.courseOutput) return;

        // Update the course object
        const updatedCourse = {
            ...course,
            courseOutput: {
                ...course.courseOutput,
                CourseName: name,
                Description: description,
            },
        };

        // Update the database
        try {
            const result = await db.update(CourseList)
                .set({
                    courseOutput: updatedCourse.courseOutput,
                })
                .where(eq(CourseList.id, course.id))
                .returning({ id: CourseList.id });

            console.log('Update successful:', result);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    

    if (!course) {
        return <div>Loading...</div>; // Handle case where course is not yet available
    }

    return (
        <Dialog>
            <DialogTrigger>
                <FaEdit />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input
                                defaultValue={course?.courseOutput?.CourseName || ''}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className="h-52"
                                defaultValue={course?.courseOutput?.Description || ''}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditCourseBasicInfo;