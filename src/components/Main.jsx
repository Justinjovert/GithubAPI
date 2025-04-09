import React, { useEffect, useState } from 'react'
import RepositoryCard from './RepositoryCard'
import UseFetch from '../hooks/UseFetch'
import SkeletonLoading from './SkeletonLoading'




function Main({ usernameParam }) {


    const [viewAbleRepo, setViewAbleRepo] = useState(4)

    const [userData, setUserData] = useState(null)


    const { data, repoList, error, loading } = UseFetch(`https://api.github.com/users/${usernameParam}`)
    const [repoData, setRepoData] = useState(null)  // Set state for repos



    useEffect(() => {
        if (data) {
            setUserData({
                avatar: data.avatar_url,
                username: data.login,
                userDescription: data.bio,
                followers: data.followers,
                following: data.following,
                location: data.location
            })
            if (repoList) {
                // Sort repo by activity
                const sortByActivity = repoList.sort((a, b) =>
                    new Date(b.updated_at) - new Date(a.updated_at))
                setRepoData(sortByActivity)        // if repo promise is fulfilled, set state // refer to UseFetch
            }
        }
    }, [data, repoList])


    // Button click to view more repositories. Default: 4
    const viewMoreRepo = () => {
        setViewAbleRepo((prev) => prev + 4)
    }

    // Render Error
    if (error) return <div className='text-4xl justify-self-center m-8 font-semibold'>{error}</div>

    // Returns a span for 'Followers', 'Following', and 'Location' info of the user
    const MiniDetail = ({ text, value }) => {
        return (
            <div className='bg-slate-900 py-2 rounded-2xl text-slate-300 font-medium my-2 divide-x-1 max-w-max h-fit inline-flex items-center text-base'>
                <span className='sm:px-6 sm:py-2 px-4 py-1 border-slate-600 text-slate-600'>{text}</span>
                <span className='sm:px-6 sm:py-2 px-4 py-1'>{value}</span>
            </div>
        )
    }


    return (
        <main className='flex flex-col pl-8 pr-8 sm:items-start md:items-center '>
            <section className='flex flex-col '>
                <section className='relative flex flex-col sm:flex-row'>
                    <div className='w-[140px] h-[140px] border-slate-800 border-8 rounded-2xl -mt-12 flex-shrink-0 bg-slate-800 overflow-hidden'>
                        {
                            loading
                                ? <div className='w-full h-full object-cover rounded-[10px]'>
                                    <SkeletonLoading width={'100%'} height={'100%'} style={{ display: 'block' }} />
                                </div>
                                : <img  // Show user display picture if it exists, otherwise default to hardcoded file
                                    className='w-full h-full object-cover rounded-[10px]'
                                    src={userData?.avatar ?? "/GithubAPI/assets/dp.webp"} alt="profile" />
                        }

                    </div>
                    <div className='flex flex-wrap gap-x-4 sm:flex-row flex-col sm:mt-2 sm:ml-4 ml-2'>
                        {
                            loading
                                ? <>
                                    <SkeletonLoading width={160} height={50} />
                                    <SkeletonLoading width={160} height={50} />
                                    <SkeletonLoading width={180} height={50} />
                                </>
                                :
                                <>
                                    <MiniDetail text={'Followers'} value={userData?.followers} />
                                    <MiniDetail text={'Following'} value={userData?.following} />
                                    <MiniDetail text={'Location'} value={userData?.location} />
                                </>
                        }
                    </div>
                </section>
                <div className='w-full'>
                    <section className='ml mt-4'>
                        <h2 className='text-4xl'>{loading ? <SkeletonLoading width={100} /> : userData?.username}</h2>
                        <span className='my-2 inline-block'>{loading ? <SkeletonLoading width={'full'} height={30} /> : userData?.userDescription}</span>
                    </section>
                    <section className='my-6'>
                        {
                            loading
                                ? <SkeletonLoading width={320} height={130} />
                                : repoData
                                    ?
                                    <>
                                        <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 w-full items-start '>
                                            {
                                                repoData.slice(0, viewAbleRepo).map(repo => {
                                                    return <RepositoryCard repo={repo} key={repo.name} />
                                                })
                                                // Display only 4(default) repository cards at first render
                                            }
                                        </section>
                                        {
                                            repoData.length > viewAbleRepo && <div className='w-full flex justify-center'>
                                                <button className='cursor-pointer m-4 mb-10' onClick={viewMoreRepo}>View more repositories</button>
                                            </div>
                                        }
                                    </>
                                    : <div>No repositories available</div>
                        }
                    </section>
                </div>
            </section>
        </main>
    )
}

export default Main
