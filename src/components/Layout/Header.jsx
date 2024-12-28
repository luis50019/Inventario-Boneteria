
export const Header = ({ title = '',children ,namePage ='',caption ='',path =""}) => {
  return (
    <>
      <div className='pl-2 flex gap-3 font-semibold items-end h-10 max-w-64 mb-4'>
        {children}
        {
          namePage && (
            <span className='font-light text-2xl'>{namePage}</span>
          )
        }
      </div>
      <h1
        className=' pl-2
        text-title font-bold text-5xl text-wrap text-left
        max-w-96'
      >
        {title}
      </h1>
      <p className='pl-2 text-span text-black mt-2 text-wrap max-w-[80%]'>{caption}</p>
    </>
  );
};
