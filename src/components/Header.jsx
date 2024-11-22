
export const Header = ({ title = '',children ,namePage ='',caption =''}) => {
  return (
    <>
      <div className='flex gap-3 font-semibold items-end h-10 w-36 border-2 mb-4'>
        {children}
        <span className='font-light'>{namePage}</span>
      </div>
      <h1
        className='
        text-title font-bold text-3xl text-wrap text-left
        max-w-64' 
      >
        {title}
      </h1>
      <p className='text-span text-black mt-2 text-wrap max-w-64'>{caption}</p>
    </>
  );
};
