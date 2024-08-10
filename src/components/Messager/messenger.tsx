import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/redux/hook';
import { setOpen } from '@/utils/redux/Slice/messengerSlice';
import {
    handleCreateMessage,
    revalidateGetMessage,
    revalidateGetMessageTag,
} from '@/utils/actions/actions';
import { getUserSelector } from '@/utils/redux/Slice/userSlice';
import { Popover } from 'antd';

import { useRouter } from 'next/navigation';

interface IProps {
    open: boolean;
    userCurrentProfile: IUser | undefined;
    messenger: IMessenger[] | undefined;
}

export default function Messenger({ open, userCurrentProfile, messenger }: IProps) {
    const currentUser = useAppSelector(getUserSelector);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            // revalidateGetMessage(
            //     currentUser?.username ?? '',
            //     userCurrentProfile?.username ?? '',
            //     userCurrentProfile?._id ?? '',
            // );

            revalidateGetMessageTag();
            // router.refresh();
        }, 6000);

        return () => clearInterval(intervalId); //This is important
    }, []);

    const handleOnEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const messenger = await handleCreateMessage({
                receiverId: userCurrentProfile?._id ?? '',
                text: message,
            });

            if (messenger.data) {
                await revalidateGetMessageTag();
            }

            setMessage('');
        }
    };

    return (
        <Box
            style={{ width: '400px', height: '300px', backgroundColor: 'white' }}
            display={open ? 'block' : 'none'}
            position={'fixed'}
            bottom={4}
            right={8}
            zIndex={1000}
            boxShadow={'0px 1px 7px 0px rgba(0, 0, 0, 0.1)'}
            borderRadius={'8px'}
            padding={'12px 0px 0px 0px'}
        >
            <Box
                position={'absolute'}
                top={0}
                right={0}
                padding={'4px 12px'}
                borderRadius={'0px 8px 0px 4px'}
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'red',
                    },
                }}
                boxShadow={'0px 1px 7px 0px rgba(0, 0, 0, 0.3)'}
                onClick={() => dispatch(setOpen(!open))}
            >
                <span style={{ fontSize: '16px' }}>x</span>
            </Box>
            {/* Text */}
            <Box
                width={'100%'}
                height={'15%'}
                position={'absolute'}
                borderRadius={'0px 0px 8px 8px'}
                bottom={0}
                boxShadow={'0px 1px 7px 0px rgba(0, 0, 0, 0.3)'}
            >
                <input
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '0px 4px',
                        fontSize: '18px',
                    }}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(e) => handleOnEnter(e)}
                />
            </Box>

            {/* Chat Block */}
            <Box
                sx={{
                    div: {
                        display: 'block',
                        fontSize: '18px',
                        '&:not(:last-child)': {
                            mb: '8px',
                        },
                        span: {
                            padding: '4px 8px',
                            backgroundColor: 'rgb(0 178 255)',
                            color: 'white',
                            borderRadius: '8px',
                        },
                    },
                }}
                padding={'0px 28px 0px 12px'}
                overflow={'scroll'}
                maxHeight={'255px'}
                display={'flex'}
                flexDirection={'column-reverse'}
            >
                {messenger?.map((item) => (
                    <div
                        style={{
                            textAlign:
                                currentUser?._id === item.senderId ? 'right' : 'left',
                        }}
                    >
                        <Popover
                            content={new Date(item.createdAt).toLocaleString()}
                            trigger="click"
                        >
                            <span
                                style={{
                                    backgroundColor:
                                        currentUser?._id === item.senderId
                                            ? 'rgb(0 178 255)'
                                            : 'rgba(22,24,35,0.1)',
                                    color:
                                        currentUser?._id === item.senderId
                                            ? 'white'
                                            : 'black',
                                }}
                            >
                                {item.text}
                            </span>
                        </Popover>
                    </div>
                ))}
            </Box>
        </Box>
    );
}
