import React from 'react';
import Clock from '../../Pages/Home/Clock';

const Info = ({drc,dc,pc}) => {
    return (
        <div className='p-2 flex gap-2 justify-between text-xs'>
            <div className=' rounded-md bg-gradient-to-r from-slate-300 to-slate-400 p-2 '>
                Request :{drc}
            </div>
            <div className=' rounded-md bg-gradient-to-r from-slate-300 to-slate-400 p-2 '>
                Doctor :{dc}
            </div>
            <div className=' rounded-md bg-gradient-to-r from-slate-300 to-slate-400 p-2 '>
                Patient :{pc}
            </div>
            
            <div className=' rounded-md  p-2 '>
                <Clock></Clock>
            </div>
            
        </div>
    );
};

export default Info;