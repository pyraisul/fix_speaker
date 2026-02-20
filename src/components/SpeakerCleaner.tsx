"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Droplet, Zap, Wind, Waves } from 'lucide-react';

type Mode = 'standard' | 'water' | 'sweep' | 'pulse';

const SpeakerCleaner = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeMode, setActiveMode] = useState<Mode>('water');
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const sweepIntervalRef = useRef<number | null>(null);

    const stopAudio = () => {
        if (oscillatorRef.current) {
            try {
                oscillatorRef.current.stop();
                oscillatorRef.current.disconnect();
            } catch (e) { }
            oscillatorRef.current = null;
        }
        if (sweepIntervalRef.current) {
            window.clearInterval(sweepIntervalRef.current);
            sweepIntervalRef.current = null;
        }
        setIsPlaying(false);
    };

    const startAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.1);

        oscillatorRef.current = osc;
        gainRef.current = gain;

        switch (activeMode) {
            case 'standard':
                osc.type = 'square';
                osc.frequency.setValueAtTime(440, ctx.currentTime);
                break;
            case 'water':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                break;
            case 'sweep':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 2);

                sweepIntervalRef.current = window.setInterval(() => {
                    osc.frequency.cancelScheduledValues(ctx.currentTime);
                    osc.frequency.setValueAtTime(150, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 2);
                }, 2000);
                break;
            case 'pulse':
                osc.type = 'square';
                osc.frequency.setValueAtTime(440, ctx.currentTime);

                sweepIntervalRef.current = window.setInterval(() => {
                    const now = ctx.currentTime;
                    gain.gain.cancelScheduledValues(now);
                    gain.gain.setValueAtTime(0.5, now);
                    gain.gain.setValueAtTime(0, now + 0.1);
                }, 200);
                break;
        }

        osc.start();
        setIsPlaying(true);
    };

    const togglePlayback = () => {
        if (isPlaying) {
            stopAudio();
        } else {
            startAudio();
        }
    };

    const modes: { id: Mode; label: string; icon: React.ReactNode; desc: string }[] = [
        { id: 'water', label: 'Water Eject', icon: <Droplet size={24} />, desc: '200Hz Heavy Vibration' },
        { id: 'standard', label: 'Clear Sound', icon: <Zap size={24} />, desc: '440Hz Square Wave' },
        { id: 'sweep', label: 'Deep Clean', icon: <Waves size={24} />, desc: '150Hz - 600Hz Sweep' },
        { id: 'pulse', label: 'Power Pulse', icon: <Wind size={24} />, desc: 'Rhythmic Bursts' },
    ];

    return (
        <div className="hero">
            <div className={`visualizer-container ${isPlaying ? 'playing-animation' : ''}`}>
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="bar"
                        style={{
                            height: isPlaying ? `${Math.random() * 80 + 20}%` : '10%',
                            transition: isPlaying ? 'height 0.1s ease' : 'height 0.5s ease'
                        }}
                    />
                ))}
            </div>

            <h1>SpeakerFix Pro</h1>
            <p>Instantly eject water and fix muffled sound from your smartphone speakers using high-frequency sound waves.</p>

            <div className="badge-container">
                <span className="badge">iPhone Compatible</span>
                <span className="badge">Android Compatible</span>
            </div>

            <button
                className="btn-primary"
                onClick={togglePlayback}
                id="main-cta-button"
            >
                {isPlaying ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Square fill="white" size={20} /> STOP CLEANING
                    </span>
                ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Play fill="white" size={20} /> START CLEANING
                    </span>
                )}
            </button>

            <div className="mode-grid">
                {modes.map((mode) => (
                    <div
                        key={mode.id}
                        className={`mode-card ${activeMode === mode.id ? 'active' : ''}`}
                        onClick={() => {
                            if (isPlaying) stopAudio();
                            setActiveMode(mode.id);
                        }}
                    >
                        <div className="mode-icon" style={{ color: activeMode === mode.id ? 'white' : 'var(--accent)' }}>
                            {mode.icon}
                        </div>
                        <div className="mode-title">{mode.label}</div>
                        <div style={{ fontSize: '0.7rem', color: activeMode === mode.id ? 'rgba(255,255,255,0.8)' : 'var(--muted)', marginTop: '4px' }}>
                            {mode.desc}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', width: '100%' }}>
                {/* AdSense Placeholder */}
                <div style={{ background: 'var(--border)', height: '100px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.8rem', border: '1px dashed var(--muted)' }}>
                    ADVERTISEMENT SPACE (Google AdSense Ready)
                </div>
            </div>
        </div>
    );
};

export default SpeakerCleaner;
