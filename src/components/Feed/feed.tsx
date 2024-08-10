'use client';
import styles from './Feed.module.scss';

import { Flex } from 'antd';

import Share from '@/components/Home/Share/share';
import ContentFeed from '@/components/ContentFeed/content.feed';
import { useAppSelector } from '@/utils/redux/hook';
import { getUserSelector } from '@/utils/redux/Slice/userSlice';
import { useSession } from 'next-auth/react';

interface IProp {
    user: IUser | undefined;
    posts: IPost[] | undefined;
    home?: boolean;
}

export default function Feed({ user, posts, home = true }: IProp) {
    const { data: sessionAuth } = useSession();

    let userCurrent = undefined;
    if (home) {
        userCurrent = useAppSelector(getUserSelector);
    } else {
        userCurrent = user;
    }

    return (
        <Flex vertical align="center" className={styles['wrapper']}>
            {(sessionAuth?.user._id === user?._id || home) && (
                <Share user={userCurrent} />
            )}
            {posts && posts.length > 0 ? (
                posts?.map((x) => (
                    <ContentFeed
                        key={x._id}
                        _id={x._id}
                        desc={x.desc}
                        likes={x.likes}
                        userId={x.userId}
                        img={x.img}
                        createdAt={x.createdAt}
                        updatedAt={x.updatedAt}
                        video={x.video}
                    />
                ))
            ) : (
                <h4 style={{ color: 'rgba(22,24,35,0.3)' }}>
                    {userCurrent?.username} don't have any posts
                </h4>
            )}
        </Flex>
    );
}
