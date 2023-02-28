import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const client = await MongoClient.connect(
    "mongodb+srv://AdilBulsari:z6dZBEsMqlo2ORPA@cluster0.laqmhem.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
