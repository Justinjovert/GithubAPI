import React, { useEffect, useState } from 'react'

export default function UseFetch(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [repoList, setRepoList] = useState(null)

    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        setLoading(true)
        const fetchThis = async (url) => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                }
                const data = await response.json()

                // Fetch Repo List
                const fetchRepoResponse = await fetch(data.repos_url)
                if (!fetchRepoResponse.ok) {
                    throw new Error(`${fetchRepoResponse.status}: ${fetchRepoResponse.statusText}`)
                }
                const repos = await fetchRepoResponse.json()

                setData(data)
                setRepoList(repos)
            }
            catch (err) {
                setError(err.message)
                setData(null)
            }
            finally {
                setLoading(false)
                
            }
        }
        fetchThis(url)
    }, [url])


    return { data, repoList, error, loading }
}

