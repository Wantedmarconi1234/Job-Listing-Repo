import React,{useState} from 'react'
import BookListData from "../data/data.json"
import HeaderImage from '../components/HeaderImage'


function BookLists() {
const [data, setData] = useState(BookListData);
const [ filters, setFilters] = useState([]);


const handleFilter = (filterValue) => {
  let updatedFilters;
  
  if (filters.includes(filterValue)) {
    updatedFilters = filters.filter((filter) => filter !== filterValue);
  } else {
    updatedFilters = [...filters, filterValue];
  }

  setFilters(updatedFilters);

  const filteredData = BookListData.filter(
    (book) =>
      updatedFilters.every(
        (filter) =>
          book.languages.includes(filter) ||
          book.tools.includes(filter) 
      )
  );
  
  setData(filteredData);
};

const handleClearFilters = () => {
  setFilters([]);
  setData(BookListData);
};



const bookListDisplay = data.map((book) => {
  return(
    <div key={book.id} className={`flex w-full bg-white mb-5 shadow rounded font-league justify-between p-5 text-xs ${ book.new && book.featured ? 'border-l-4 border-l-[#5ba4a4]' : ''}`}>
      <div className='flex items-center cursor-pointer'>
        <div className='mx-3'><img src={book.logo} alt="" height='60' width='60'/></div>
        <div>
          <div className='flex'>
            <h1 className='font-bold mb-2 text-[#5ba4a4] mr-2'>{book.company}</h1>
            <h1>{book.new && <p className='text-[8px] tracking-widest mr-2 bg-[#5ba4a4] font-semibold px-[3px] rounded-full text-white'>NEW!</p>}</h1>
            <h1>{book.featured && <span className='text-[8px] tracking-widest text-white font-semibold bg-black p-[3px] rounded-full'>FEATURED</span>}</h1>
          </div>
          <div className='mb-2 font-bold hover:text-[#5ba4a4]'><h1>{book.position}</h1></div>
          <div className='text-[11px] text-[#7b8e8e] font-semibold'><span>{book.postedAt}</span><span className='mx-3'>{book.contract}</span><span>{book.location}</span></div>
        </div>
      </div>
      <div className='flex items-center cursor-pointer'>
        <span className='rounded p-1 font-semibold text-[#5ba4a4] mx-5 bg-[#eef6f6] hover:text-white hover:bg-[#5ba4a4]' >{book.role}</span>
        <span className='rounded p-1 font-semibold text-[#5ba4a4] bg-[#eef6f6] hover:text-white hover:bg-[#5ba4a4]'>{book.level}</span>
        <p>{book.languages && book.languages.map(language => <button onClick ={() => handleFilter(language)} className={`rounded mx-3 p-1 font-semibold text-[#5ba4a4] bg-[#eef6f6] hover:text-white hover:bg-[#5ba4a4] ${
          filters.includes(language) ? 'bg-[#5ba4a4] text-white' : ''
        }`}>{language}</button> )}</p>
        <p>{book.tools && book.tools.map(tool => <button onClick={() => handleFilter(tool)} className={`rounded p-1 font-semibold text-[#5ba4a4] bg-[#eef6f6] hover:text-white hover:bg-[#5ba4a4] ${
          filters.includes(tool) ? 'bg-[#5ba4a4] text-white' : ''
        }`}>{tool}</button>)}</p>
      </div>
    </div>
  )
})



  return (
    <div className=''>
      <HeaderImage/>
      <div className='bg-[#effafa] p-20'>
      <div className={`flex justify-between mb-4 ${filters.length > 0 && 'bg-white shadow p-5'} `}>
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <div key={filter} className="flex items-center bg-[#5ba4a4] text-white rounded-full p-1 pl-2 pr-2">
              <span className="mr-1">{filter}</span>
              <button onClick={() => handleFilter(filter)} className="text-white font-bold">
                X
              </button>
            </div>
          ))}
        </div>
        {filters.length > 0 && (
          <button onClick={handleClearFilters} className="text-[#5ba4a4] font-semibold">
            Clear All
          </button>
        )}
      </div>
        {bookListDisplay}
      </div>
    </div>
  )
}

export default BookLists