"use client"
import { UserButton } from '@clerk/nextjs';

import { CreateAction } from './CreateAction';
import Notification from './Notification';

const LoginProifle = () => {
    return (
        <div className="flex items-center gap-x-4">
            <CreateAction></CreateAction>
            <Notification></Notification>
            <div className='hidden lg:block'>
                <UserButton></UserButton>
            </div>
        </div>
    );
};

export default LoginProifle;
