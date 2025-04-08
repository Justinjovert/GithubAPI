import React from 'react'

function RepositoryCard({ repo }) {


    const MiniDetails = ({ icoLabel, value }) => {
        console.log(icoLabel)
        return (
            <div className='flex gap-x-1 text-sm items-center'>
                <img src={icoLabel} alt='icon'/>
                <span>{value}</span>
            </div>
        )
    }

    const {
        name,
        description,
        license,
        updated_at,
        forks_count,
        stargazers_count,
        html_url
    } = repo

    const changeDateToString = (updated_at) => {
        // Get today's date and subtract from updated_at
        const toDate = new Date()
        const upDated = new Date(updated_at)

        const seconds = (toDate - upDated) / 1000 // Convert from ms to s

        const timeUnitsList = [
            { label: "year", seconds: 31_557_600 },    // 365.25 days
            { label: "month", seconds: 2_629_746 },    // 30.44 days
            { label: "week", seconds: 604_800 },       // 7 days
            { label: "day", seconds: 86_400 },         // 24 hours
            { label: "hour", seconds: 3_600 },         // 60 minutes
            { label: "minute", seconds: 60 },          // 60 seconds
        ]

        // If quotient is above or equal to 1, then it corresponds to label
        // i.e. "1.xxx" year, "0.9xx" then it's below year and so on
        for (const time of timeUnitsList) {
            let interval = Math.floor(seconds / time.seconds)
            if(interval >= 1) {
                return [interval, `${time.label}${interval > 1 ? 's' : ''}`]
            }
        }
        return [0, 'a few seconds ago']
    }

    const [interval, timeUnit] = changeDateToString(updated_at)

    return (
        <a className='p-4 rounded-2xl min-w-[220px] max-w-[500px] h-auto bg-[linear-gradient(95deg,#111729_3%,#1d1b48_99.61%)] cursor-pointer' href={html_url} target='_blank'>
            <h3 className='text-lg text-white'>{name}</h3>
            <span className='text-sm text-slate-300 mt-2 mb-4 inline-flex'>{description}</span>
            <div className='text-slate-300 font-semibold flex gap-x-4 items-center flex-wrap'>
                {license !== null && <MiniDetails icoLabel='/GithubAPI/assets/Chield_alt.svg' value={'MIT'} />}
                <MiniDetails icoLabel='/GithubAPI/assets/Nesting.svg' value={forks_count} />
                <MiniDetails icoLabel='/GithubAPI/assets/Star.svg' value={stargazers_count} />
                <span className='font-medium text-sm ml-2'>updated {interval != 0 ? interval : ''} {timeUnit} ago</span>
            </div>
        </a>
    )
}

export default RepositoryCard
