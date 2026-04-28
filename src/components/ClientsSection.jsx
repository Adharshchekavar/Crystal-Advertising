import React from 'react';
import { motion } from 'framer-motion';
import '../styles/HomePage.css';

import baic from "../assets/clients/baic.png";
import chaseSports from "../assets/clients/chase_sports.jpeg";
import closeup from "../assets/clients/closeup.png";
import dominos from "../assets/clients/dominos.png";
import ginox from "../assets/clients/ginox.jpeg";
import panol from "../assets/clients/panol.jpeg";
import qCafe from "../assets/clients/q_cafe.jpeg";
import rakAcademy from "../assets/clients/rak_academy.png";
import rakAirport from "../assets/clients/rak_airport.png";
import rakCustoms from "../assets/clients/rak_customs.png";
import rotana from "../assets/clients/rotana.png";
import valvoline from "../assets/clients/valvoline.jpeg";
import zinjibari from "../assets/clients/zinjibari.png";
import beargrylls from "../assets/clients/Bear_Grylls.jpeg";
import rakcentralbank from "../assets/clients/central.png";
import alreem from "../assets/clients/al_reem.png";

const clients = [
    { name: "BAIC", img: baic },
    { name: "Chase Sports", img: chaseSports },
    { name: "Closeup", img: closeup },
    { name: "Domino's", img: dominos },
    { name: "Ginox", img: ginox },
    { name: "Panol", img: panol },
    { name: "Q Cafe", img: qCafe },
    { name: "RAK Academy", img: rakAcademy },
    { name: "RAK Airport", img: rakAirport },
    { name: "RAK Customs", img: rakCustoms },
    { name: "Rotana", img: rotana },
    { name: "Valvoline", img: valvoline },
    { name: "Zinjibari", img: zinjibari },
    { name: "Bear Grylls", img: beargrylls },
    { name: "RAK Central Bank", img: rakcentralbank },
    { name: "Al Reem Kitchen", img: alreem },
];

const ghostCount = clients.length % 4 === 0 ? 0 : 4 - (clients.length % 4);

function ClientCard({ client }) {
    return (
        <motion.div
            className="client-card"
            variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
            }}
        >
            <img
                src={client.img}
                alt={client.name}
                className="client-logo"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="client-name">{client.name}</span>
        </motion.div>
    );
}

export default function ClientsSection() {
    return (
        <section className="clients-section">
            <motion.div
                className="clients-header-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
            >
                <div className="clients-header-left">
                    <span className="clients-eyebrow">Our Clients</span>
                    <h2 className="clients-heading">
                        BRANDS WE'RE<br />
                        <span className="clients-heading-gold">PROUD TO SERVE.</span>
                    </h2>
                    <p className="clients-sub">
                        From startups to global brands, we've partnered with businesses
                        across industries. Here are some of the clients we're proud to
                        work with.
                    </p>
                </div>
            </motion.div>
            <motion.div
                className="clients-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.08 } }
                }}
            >
                {clients.map((c) => (
                    <ClientCard key={c.name} client={c} />
                ))}
                {Array.from({ length: ghostCount }).map((_, i) => (
                    <div key={`ghost-${i}`} className="clients-ghost" />
                ))}
            </motion.div>
        </section>
    );
}