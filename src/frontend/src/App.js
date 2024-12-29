import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import PlanList from './components/PlanList';
import './tailwind.css';
import EjerciciosList from './components/EjerciciosList';
import RutinasList from './components/RutinasList';
import ProgresoList from './components/ProgresoList';
import EntrenadoresList from './components/EntrenadoresList';
import AttendancesList from './components/AttendancesList';
import MembershipList from './components/MembershipList';
import RoutineExercise from './components/RoutineExerciseList';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl w-[80%] m-auto font-bold text-center text-gray-900 mb-8 shadow-lg p-4 bg-white rounded-lg">
          App Gym
        </h1>
        <Routes>
          <Route path="/" element={<Navigate to="/usuarios" />} /> {/* Redirige a usuarios */}
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/planes" element={<PlanList />} />
          <Route path="/asistencias" element={<AttendancesList />} />
          <Route path="/membresias" element={<MembershipList />} />
          <Route path="/ejercicios" element={<EjerciciosList />} />
          <Route path="/rutinas" element={<RutinasList />} />
          <Route path="/rutinas_ejercicios" element={<RoutineExercise />} />
          <Route path="/progresos" element={<ProgresoList />} />
          <Route path="/entrenadores" element={<EntrenadoresList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
