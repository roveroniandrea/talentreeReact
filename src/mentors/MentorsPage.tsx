import mentors from '../core/mentors.json';
import MentorBox from './mentorBox/MentorBox';

export default function MentorsPage() {
    return (
        <div>
            {mentors.map((mentor, i) => <MentorBox key={ i } mentor={ mentor } />) }
        </div>
    );
}