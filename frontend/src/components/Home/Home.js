import React, { useEffect }  from 'react';
import './Home.scss';
import { Divider, TextField, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TableData from '../TableData';
import { getCrawledData } from '../../services/index';
import { useDispatch, useSelector } from 'react-redux';
import { saveDataToState } from '../../store/reducers/crawledPageReducer';

const Home = () => {

  // redux state variables
  const crawledPage = useSelector((store) => store.crawledData);
  // eslint-disable-next-line no-console
  const dispatch = useDispatch();

  useEffect(() => {
    getCrawledData().then((res) => {
      dispatch(saveDataToState(res.data));
    }).catch(() => {
      // console.log(error);
    });
  }, []);

  return (
    <div className='main'>
      <Container fixed>
        <Grid container>
          <Grid item xs>
            <h1>Entail Dev Test</h1>
            <Divider/>
            {/* <div className='dataContainer'> */}
            <Grid container spacing={2} className='dataContainer'>
              <Grid item xs={6}>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  placeholder="Product Title"
                  type="text"
                />
                {/* <button>Search</button> */}
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary">
                  Crawl
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TableData data = {crawledPage}/>
              </Grid>
            </Grid>
            {/* </div> */}
          </Grid>
        </Grid>
      </Container>

    </div>
  );
};

export default Home;
