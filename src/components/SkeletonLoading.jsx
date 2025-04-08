import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoading = ({ ...props }) => {
    return (
        <Skeleton {...props} baseColor="#1e293b" highlightColor="#475569" />
    )
}

export default SkeletonLoading