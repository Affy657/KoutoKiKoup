import Box from "@mui/material/Box";
import IsEmptyImage from "../../assets/no_data.svg";

const IsEmpty = () => {
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
            <img src={IsEmptyImage} alt="It's empty"/>
        </Box>
    );
}

export default IsEmpty;