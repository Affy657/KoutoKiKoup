import NotFoundImage from "../../assets/404.svg";
import Box from "@mui/material/Box";

const Notfound = () => {
    return (
        <Box sx={{
            maxWidth: '40vw',
            maxHeight: '40vh',
            width: 'auto',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            paddingBottom: '20px'
        }}>
            <img src={NotFoundImage} alt="404 Not Found" />
        </Box>
    );
}

export default Notfound;