import React, { useEffect, useState }  from 'react';
import './Home.scss';
import { Divider, TextField, Button, Snackbar , CircularProgress} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import TableData from '../TableData';
import { getCrawledData, submitCrawledUrlToServer } from '../../services/index';
import { useDispatch, useSelector } from 'react-redux';
import { saveDataToState } from '../../store/reducers/crawledPageReducer';
import LoadingComponent from '../LoadingComponent';
import { isValidURL } from '../../utils/validations';

const Home = () => {

  // redux state variables
  const crawledPage = useSelector((store) => store.crawledData);
  // eslint-disable-next-line no-console
  const dispatch = useDispatch();
  // const [crawledDataList, setCrawledPageListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [urlToCrawl, setUrlToCrawledToState] = useState('');
  const [isError, setIsError] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isCrawlingData, setIsCrawlingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    getData(currentPage);
  }, []);
  const getData = (value) => {
    setIsLoading(true);
    getCrawledData(value, 10).then((res) => {
      dispatch(saveDataToState(res));
      setCurrentPage(res.currentPage);
      setTotalPages(res.totalPages);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  };
  const handleUrlToCrawlChange = (event) => {
    setUrlToCrawledToState(event.target.value);
    setIsError(false);
  };
  const handleCloseAlert = () => {
    setshowAlert(false);
  };
  const handleChangePageNumber = (event, value) => {
    setCurrentPage(value);
    // eslint-disable-next-line no-console
    // console.log(value);
    getData(value);
  };
  const handleSubmitUrlToCrawl = (event) => {
    event.preventDefault();
    if(urlToCrawl === '' || !isValidURL(urlToCrawl)){
      setIsError(true);
      return;
    }
    setIsCrawlingData(true);
    // call api
    submitCrawledUrlToServer({url: urlToCrawl}).then((res) => {
      if(res.status === 'success'){
        setshowAlert(true);
        setAlertType('success');
        setAlertText('URL scrapped successfullly.');
        getData();
        setIsCrawlingData(false);
      }else {
        setshowAlert(true);
        setAlertType('error');
        setAlertText('Scrapping failed.');
        setIsCrawlingData(false);
      }
    }).catch(() => {
      setIsCrawlingData(false);
      setshowAlert(true);
      setAlertType('error');
      setAlertText('Scrapping failed.');
    });
  };
  return (
    <div className='main'>
      <Container fixed>
        <Grid container>
          <Grid item xs ={12}>
            {/* <h1>Entail Dev Test</h1> */}
            <h1>Entail Dev Test</h1>
            <Divider/>
            {/* <div className='dataContainer'> */}
            <Grid container spacing={2} justifyContent="flex-end"  className='dataContainer'>
              <Grid container spacing={2} justifyContent="flex-end"  className='formInputContainer'>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    required
                    error={isError ? true : false}
                    variant="outlined"
                    fullWidth
                    placeholder="Paste URL here..."
                    type="text"
                    helperText= {isError ? 'Must be a valid url': ''}
                    name='urlToCrawl'
                    defaultValue={urlToCrawl || ''}
                    onChange={handleUrlToCrawlChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color="primary" onClick={handleSubmitUrlToCrawl} className='crawlButton'>
                    {isCrawlingData && (
                      <div style={{ marginRight: '5px' }}>
                        <CircularProgress size={20} />
                      </div>
                    )}
                    { isCrawlingData ? 'Crawling': 'Crawl'}
                  </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" className='tabledata'>
                { isLoading ?
                  <div className='loaderContainer' justifyContent="flex-end">
                    <LoadingComponent />
                  </div>
                  :  <div ><TableData data = {crawledPage.data}/> </div>
                }
                <Pagination count={totalPages} page={currentPage} onChange={handleChangePageNumber} />
              </Grid>
            </Grid>
            {/* </div> */}
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: '100%' }}
        >
          { alertText }
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
