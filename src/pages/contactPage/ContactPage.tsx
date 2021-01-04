import { Utility } from '../../utility/Utility';

export default function ContactPage() {
    return (
        <div className="columns" style={ ({ minHeight: '400px', padding: '20px' }) }>
            <div className="column" style={ ({ textAlign: 'end' }) }>
                <iframe title="maps" width="100%" height="100%" frameBorder="0" style={ ({ border: '0' }) } src={ Utility.getMapsUrl() } allowFullScreen></iframe>
            </div>
            <div className="column">
                <p>Associazione Culturale e di promozione sociale Talentree</p>
                <p>Via Asiago, 3</p>
                <p>30033 Noale (VE)</p>
                <p>Codice Fiscale: 90166820275</p>
                <p>P.IVA 04393670270</p>
                <p>Presidente Claudia Castegnaro</p>
                <p>Email: presidente@talentree.it</p>
            </div>
        </div>
    );
}