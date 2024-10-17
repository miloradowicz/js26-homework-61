import './Preloader.css';

const Preloader = () => {
  return (
    <>
      <div className='preloader-backdrop' />
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </>
  );
};

export default Preloader;
