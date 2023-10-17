import React, { createContext, useState, useEffect, useContext } from 'react';
import { movieApi } from './../util/movieApi';


const detailContext = createContext();