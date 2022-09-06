import React from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Typography, CardActions, Card, CardHeader, Avatar, CardContent, Button } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import Header from '../components/Header';


import { useNavigate } from 'react-router-dom';
export default function Detail() {

    const navigate = useNavigate();

    const param = useParams();



    return (
        <>
            <IconButton style={IconCss} size='large' onClick={() => { navigate(-1) }}>
                <ChevronLeftRoundedIcon fontSize="large" />
            </IconButton>

            <img style={imgCss} src='https://picsum.photos/200' onClick={() => { alert('클릭!') }} />

            <Card sx={{ width: '100vw' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={postData.nickname}
                    subheader={postData.location}
                />
                <CardContent>
                    <Typography variant="h5" color="text.main">
                        {postData.postTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {postData.category}&nbsp;&nbsp;{postData.postDate}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {postData.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing >
                    <IconButton aria-label="add to favorites">
                        <BookmarkIcon />
                    </IconButton>
                    <Button style={ButtonCss} fullWidth startIcon={<QuestionAnswerRoundedIcon />}>
                        1:1 채팅
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

const IconCss = {
    position: 'absolute',
    color: 'white',
}


const imgCss = {
    width: '100vw',
}

const ButtonCss = {
    color: 'white',
    backgroundColor: 'gray'
}

const postData = {
    nickname: '영등포꿀쟁이',
    location: '영등포구',
    postDate: '2022.08.13',
    postTitle: 'IT 전공 서적 교환하실 분~!!',
    category: '서적',
    content: 'IT 전공서적 교환하실 분 구합니다.\n기프티콘과 거래했으면 좋겠습니다.\n대면으로 거래 희망합니다.\n장소는 숭실대입구역에서 진행합니다.\n희망 시 채팅주시길 바랍니다.😆'
}