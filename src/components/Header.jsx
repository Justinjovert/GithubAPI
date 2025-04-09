import React, { useEffect, useRef, useState } from 'react'


import headerBG from '/assets/hero-image-github-profile.jpg'
import headerBGsm from '/assets/hero-image-github-profile-sm.jpg'
import searchSVG from '/assets/Search.svg'
import Skeleton from 'react-loading-skeleton'
import SkeletonLoading from './SkeletonLoading'


// Delay function 
const debounce = (fn, delay) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}


function Header({ setUsernameParam }) {

    const [inputValue, setInputValue] = useState('')

    const [displaySearch, setDisplaySearch] = useState(false)
    const [matchingUser, setMatchingUser] = useState(null)
    const [isLoading, setLoading] = useState(false)


    // Handle onChange of input using debounce and useRef
    // Practice usage of useRef
    const debouncedRef = useRef(debounce((e) => setInputValue(e.target.value), 300)).current

    // handle input
    const handleInput = () => {
        setUsernameParam(inputValue)
    }


    // Fetch possible users
    useEffect(() => {
        if (inputValue == '') {
            setMatchingUser(null)
            return
        }     // if empty string

        // fetch matching user
        const fetchMatchingUser = async (inputValue) => {
            setLoading(true)
            try {
                const response = await fetch(`https://api.github.com/users/${inputValue}`)

                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                }

                const data = await response.json()
                setMatchingUser({
                    avatar_url: data.avatar_url,
                    name: data.name ?? data.login,
                    description: data.bio.slice(0, 60) + '...'
                })

            }
            catch (err) {
                console.error(err)
                setMatchingUser(null)
            }
            finally {
                setLoading(false)
            }
        }
        fetchMatchingUser(inputValue)
    }, [inputValue])


    return (
        /* bg-[image:var(--bg-sm)] md:bg-[image:var(--bg-big)] w-full h-54 bg-no-repeat flex justify-center items-start bg-cover bg-center */
        <div className='min-w-[320px] bg-[image:var(--bg-sm)] md:bg-[image:var(--bg-big)] w-full h-54 bg-no-repeat flex justify-center items-start bg-cover bg-center'
            style={{
                '--bg-big': `url(${headerBG})`,
                '--bg-sm': `url(${headerBGsm})`
            }}>
            <div className='w-[420px] min-w-[160px] relative m-8'>
                <div  className='bg-no-repeat absolute top-3.5 left-2 h-5.5 w-[24px]' >
                    <img src={searchSVG} alt='search' className='bg-no-repeat h-full w-full' />
                </div>
                <input
                    className='w-full max-w-[420px] p-3 pl-9 bg-slate-800 rounded-lg shadow-md focus:outline-0 focus:ring-2 focus:ring-blue-500  focus:outline-slate-600 font-medium'
                    placeholder='username'
                    id='searchUsername'
                    onChange={debouncedRef}
                    onFocus={() => setDisplaySearch(true)}
                    onBlur={() => setDisplaySearch(false)}
                />
                {
                    displaySearch && matchingUser &&
                    <div className='bg-slate-900 rounded-lg p-1.5 box-border  my-3'>
                        <div className='hover:bg-slate-800 rounded-[5px] cursor-pointer flex items-center p-0.5 w-auto h-auto' onMouseDown={handleInput}>
                            <div className='w-[60px] h-[60px] bg-no-repeat bg-center'>
                                {isLoading ? <SkeletonLoading width={'full'} height={55} /> : <img className='w-full h-full rounded-[10px]' src={matchingUser?.avatar_url ?? 'assets/dp.webp'} alt='img' />}
                            </div>
                            <div className='ml-2'>
                                <h3 className='text-[1rem] mb-1'>{isLoading ? <SkeletonLoading width={120} height={'full'} /> : matchingUser?.name}</h3>
                                <div className='text-[0.7rem] text-slate-400'>{isLoading ? <SkeletonLoading width={'full'} height={'full'} /> : matchingUser?.description}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Header
