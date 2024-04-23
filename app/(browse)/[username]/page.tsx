interface UserPageProps {
    params:{
        username: string
    }
}

const UserPage = ({
    params
}:UserPageProps) => {
    return (
        <div>
            User Page
        </div>
    )
}

export default UserPage;