import { ChatboxReciever, ChatboxSender } from '../../components/Chatbox/Chatbox'; // Import the ChatboxReceiver component

import Emergency from '../Emergency';
import Services from '../Services';
import DoctorList from '../../components/Profile/DoctorList';
import Banner from './Banner';
import Category from '../Category';
import InputText from '../../components/InputText';
import ChatContainer from '../../components/ChatContainer';

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-slate-400 to-slate-700 text-black min-h-screen">
            <Banner />

            <ChatContainer/>
{/* 
            <section>
                <h1>Super Chat</h1>
              
                <ChatboxReciever user="pateints" avatar='https://3978159.fs1.hubspotusercontent-na1.net/hubfs/3978159/Closeup%20of%20hands%20of%20young%20man%20in%20checkered%20shirt%20using%20mobile%20phone%20while%20his%20partners%20arguing.jpeg' message="hi" />
            </section> */}
            {/* <section>
               
                
                <ChatboxSender user="docotrs" avatar='https://3978159.fs1.hubspotusercontent-na1.net/hubfs/3978159/Closeup%20of%20hands%20of%20young%20man%20in%20checkered%20shirt%20using%20mobile%20phone%20while%20his%20partners%20arguing.jpeg' message="hello" />
            </section> */}
            {/* <InputText onAddMessage={(message) => console.log(message.message)} /> */}

            

            {/* Hero section */}

            {/* Features section */}
            <section>
                <Category />
            </section>

            {/* Services section */}
            <section>
                <div className=' p-4'>
                    <h2 className=" text-center text-3xl font-bold mb-8">Doctors</h2>
                    <DoctorList />
                </div>
            </section>
            
            <section>
                <Services />
            </section>

            {/* Contact section */}
            <section>
                <Emergency />
            </section>

            {/* Footer section */}
        </div>
    );
};

export default Home;
