import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import NextAuthSessionWrapper from '@/lib/next.auth.wrapper';
import NProgressWrapper from '@/lib/nprogress.wrapper';
import './global.scss';
import ReduxWrapper from '@/utils/redux/redux.wrapper';
import ReduxFetchApi from '@/utils/redux/WrapperReducerRedux/redux.fetchApi';

export const metadata = {
    title: 'Facebook Clone',
    description: 'Facebook Clone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>
                    <ThemeRegistry>
                        <NProgressWrapper>
                            <NextAuthSessionWrapper>
                                <ReduxWrapper>
                                    <ReduxFetchApi>{children}</ReduxFetchApi>
                                </ReduxWrapper>
                            </NextAuthSessionWrapper>
                        </NProgressWrapper>
                    </ThemeRegistry>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
