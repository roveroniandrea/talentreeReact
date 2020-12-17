import { Fragment } from 'react';
import mentors from '../core/mentors.json';
import MentorBox from './mentorBox/MentorBox';

export default function MentorsPage() {
    mentors.sort((m1, m2) => m1.name.localeCompare(m2.name));
    return <Fragment>
        { mentors.map((mentor, i) => <MentorBox key={ i } mentor={ mentor } left={ i % 2 == 0 } />) }
    </Fragment>;
}