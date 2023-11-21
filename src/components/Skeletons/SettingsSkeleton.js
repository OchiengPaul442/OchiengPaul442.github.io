import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Page from '../../layout/Page'

const SettingsSkeleton = () => {
    return (
        <Page title={<Skeleton width={200} height={40} />}>
            <Skeleton
                variant="rectangular"
                width="100%"
                sx={{
                    borderRadius: '8px',
                }}
                height={200}
                className="mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        sx={{
                            borderRadius: '8px',
                        }}
                        height={200}
                    />
                </div>
                <div className="col-span-1">
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        sx={{
                            borderRadius: '8px',
                        }}
                        height={200}
                    />
                </div>
            </div>
        </Page>
    )
}

export default SettingsSkeleton
