import { MongoClient, ObjectId } from "mongodb";
import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetails";

export default function MeetupDetails(props) {
  return (
    <MeetupDetail
      description={props.meetupData.description}
      address={props.meetupData.address}
      title={props.meetupData.title}
      image={props.meetupData.image}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://AdilBulsari:z6dZBEsMqlo2ORPA@cluster0.laqmhem.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection
    .find(
      {},
      {
        _id: 1,
      }
    )
    .toArray();
  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://AdilBulsari:z6dZBEsMqlo2ORPA@cluster0.laqmhem.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = await db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: JSON.parse(JSON.stringify(selectedMeetup)),
    },
  };
}
