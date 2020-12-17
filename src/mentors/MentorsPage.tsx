import mentors from '../core/mentors.json';
import MentorBox from './mentorBox/MentorBox';

export default function MentorsPage() {
    mentors.sort((m1, m2) => m1.name.localeCompare(m2.name));
    return (
        <div>
            {mentors.map((mentor, i) => <MentorBox key={ i } mentor={ mentor } />) }
        </div>
    );
}